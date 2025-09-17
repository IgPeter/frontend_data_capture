import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/forms/TextInput";
import SelectInput from "@/components/forms/SelectInput";
import FileInput from "@/components/forms/FileInput";
import PhoneInput from "@/components/forms/PhoneInput";
import { StaffFormFields } from "@/constants/staffFormFields";
import mainStyles from "../../stylesheets/main.module.css";
import TextareaInput from "@/components/forms/TextareaInput";
import { saveOffline } from "../../storage/offlineStorage";
import { baseUrl } from "../../utilities/BaseUrl";
import Nav from "../nav";
import { syncAllData } from "../../../syncService";
import { useData } from "../../context/appContext";

export default function StaffForm() {
  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const { school } = useData();

  let staffFormFields = StaffFormFields();
  staffFormFields = staffFormFields.props.children;

  // ✅ Split form fields into groups (pages)
  const steps = [
    staffFormFields.slice(0, 5), // Page 1 fields
    staffFormFields.slice(5, 10), // Page 2 fields
    staffFormFields.slice(10, 15), // Page 3 fields
    staffFormFields.slice(15, 20), // Page 4 fields
    staffFormFields.slice(20, 25), // page 5 fields
    staffFormFields.slice(25), //final page fields
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

  const callUploadOnline = async () => {
    await syncAllData();
    alert("Offline data successfully uploaded");
    setOfflineMode(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all fields
      for (let key in data) {
        if (
          data[key] === undefined ||
          data[key] === "" ||
          data[key] === "undefined"
        ) {
          formData.append(key, "");
        } else {
          formData.append(key, data[key]);
        }
      }

      // Append location
      if (location.lat && location.lng) {
        formData.append("latitude", location.lat);
        formData.append("longitude", location.lng);
      }

      // Send to backend
      const res = await fetch(`${baseUrl}/staffs?school=${school}`, {
        method: "POST",
        body: formData, // 🚨 no headers["Content-Type"], browser will set it automatically
      });

      if (!res.ok) throw new Error("Failed to upload");

      console.log("✅ Staff data uploaded", await res.json());
      reset();
      setPreviewImage(null);
      setStep(0);
    } catch (err) {
      console.warn("⚠️ Offline, saving staff locally...");
      await saveOffline("staffs", data);
      setOfflineMode(true);
      reset();
      setPreviewImage(null);
      setStep(0);
    } finally {
      setLoading(false);
    }
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
      case "lastAppointment":
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
          <div className="w-full mb-4 flex border rounded">
            <div className="w-[50%] h-54 flex justify-center items-center">
              <FileInput
                key={field.name}
                control={control}
                name={field.name}
                label={field.label}
                rules={{ required: `${field.label} is required` }}
                onFileSelect={(file) => {
                  if (file) {
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <div className="w-[50%] p-8 rounded flex justify-center items-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-45 h-45 rounded"
                />
              ) : (
                <img
                  src="data:image/png;base64,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"
                  alt="user-male-circle"
                  className="w-45 h-45"
                />
              )}
            </div>
          </div>
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
      <div className="w-[60%]">
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex justify-between mt-4 py-8">
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
