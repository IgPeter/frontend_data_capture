import { useState, useEffect } from "react";
import { learnersFormFields } from "../../constants/learnersFormFields";
import { useForm } from "react-hook-form";
import TextInput from "@/components/forms/TextInput";
import SelectInput from "@/components/forms/SelectInput";
import FileInput from "@/components/forms/FileInput";
import PhoneInput from "@/components/forms/PhoneInput";
import TextareaInput from "@/components/forms/TextareaInput";
import mainStyles from "../../stylesheets/main.module.css";
import Nav from "../nav";

export default function LearnersForm() {
  const {
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { erros },
  } = useForm();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const steps = [
    learnersFormFields.slice(0, 4), // Page 1 fields
    learnersFormFields.slice(4, 8), // Page 2 fields
    learnersFormFields.slice(8, 12), // Page 3 fields
  ];

  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get location. Please enable location services.");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    };

    fetchLocation();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    // send data to backend API here
    //Send staff data here

    data.latitude = location.lat;
    data.longitude = location.lng;
    try {
      const res = await fetch("http://localhost:3000/api/v1/learners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to upload");

      console.log("✅ Staff data uploaded", await res.json());
      reset();
      setLoading(false);
      setStep(0);
    } catch (error) {
      console.warn("⚠️ Offline, saving learners locally...");
      await saveOffline("learners", data);
      reset();
      setStep(0);
      setOfflineMode(true);
    } finally {
      setLoading(false);
    }
  };

  const callUploadOnline = async () => {
    await syncAllData();
    alert("Offline data successfully uploaded");
    setOfflineMode(false);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "date":
        return (
          <TextInput
            key={field.name}
            control={control}
            name={field.name}
            label={field.label}
            type={field.type}
            rules={{ required: `${field.label} is required` }}
          />
        );
      case "NIN":
        return (
          <TextInput
            key={field.name}
            control={control}
            name={field.name}
            label={field.label}
            type={field.type}
          />
        );
      case "tel":
        return (
          <PhoneInput
            key={field.name}
            control={control}
            name={field.name}
            label={field.label}
            type={field.type}
            rules={{ required: `${field.label} is required` }}
          />
        );
      case "textarea":
        return (
          <TextareaInput
            key={field.name}
            control={control}
            name={field.name}
            label={field.label}
            rules={{ required: `${field.label} is required` }}
          />
        );
      case "select":
        return (
          <SelectInput
            key={field.name}
            control={control}
            name={field.name}
            label={field.label}
            options={field.options}
            rules={{ required: `${field.label} is required` }}
          />
        );
      case "file":
        return (
          <FileInput
            key={field.name}
            control={control}
            name={field.name}
            label={field.label}
            rules={{ required: `${field.label} is required` }}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = async () => {
    const currentFields = steps[step].map((f) => f.name);
    const valid = await trigger(currentFields); // only validate current step fields
    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <div className={`${mainStyles.container}`}>
      <div>
        <Nav />
      </div>
      <div className="mt-4 mb-4 text-sm text-gray-600">
        {location.lat && location.lng ? (
          <p>
            📍 Location captured: Coordinates Lat: {location.lat}, Lng:{" "}
            {location.lng}
          </p>
        ) : (
          <p>📍 Capturing location...</p>
        )}
      </div>
      {offlineMode ? (
        <div className="flex justify-start mb-4">
          <button
            className="bg-[#079DD9] px-6 py-2 rounded text-white flex items-center gap-2"
            onClick={callUploadOnline}
          >
            Upload data
          </button>
        </div>
      ) : null}
      <div className="w-[60%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ✅ Page Navigation */}
          <div className="flex gap-2 mb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`px-3 py-1 border rounded ${
                  step === index ? "bg-[#079DD9] text-[#f4f4f4]" : "bg-gray-200"
                }`}
                onClick={handleNext}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* ✅ Render only current step fields */}
          {steps[step].map(renderField)}

          {/* ✅ Navigation buttons */}
          <div className="flex justify-between mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Previous
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-[#079DD9] text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded text-white flex items-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1FA2BF] hover:bg-green-600"
                }`}
              >
                {loading && (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
