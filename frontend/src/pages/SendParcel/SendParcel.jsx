import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const parcelType = watch("parcelType");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateCost = (data) => {
    let baseCost = data.parcelType === "document" ? 50 : 100;
    let serviceCharge =
      data.receiverServiceCenter === data.senderServiceCenter ? 2 : 5;
    let weightCharge = data.weight ? parseFloat(data.weight) * 0.2 : 50;
    return baseCost + serviceCharge + weightCharge;
  };

  const onSubmit = (data) => {
    const totalCost = calculateCost(data);

    Swal.fire({
      title: "Delivery Cost",
      html: `<p class="text-gray-700">Your total delivery cost is <b>$${totalCost.toFixed(
        2
      )}</b>.</p>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Save",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#9ca3af",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true);
        try {
          const parcelData = {
            ...data,
            userEmail: user?.email,
            createdBy: user?.displayName || "Anonymous",
            creation_date: new Date().toISOString(),
            creation_time: new Date().toLocaleString(),
            trackingId: `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            status: "Pending Pickup",
            estimatedDelivery: new Date(
              Date.now() + 3 * 24 * 60 * 60 * 1000
            ).toISOString(),
            cost: totalCost,
            currency: "USD",
            paymentStatus: "Unpaid",
          };

          await axiosSecure.post("/parcels", parcelData);
          Swal.fire("Success!", "Parcel saved successfully.", "success");
          reset();
        } catch {
          Swal.fire("Error", "Failed to save parcel info.", "error");
        } finally {
          setIsSubmitting(false);
        }
      }
    });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto my-10 bg-base-200 p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-2">Send a Parcel</h1>
        <p className="text-center text-gray-600 mb-6">
          Please fill in the details below to schedule your parcel delivery.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Info Section */}
          <section className="bg-base-100 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Parcel Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type */}
              <div>
                <label className="label">Type</label>
                <select
                  {...register("parcelType", { required: "Required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Type</option>
                  <option value="document">Document</option>
                  <option value="non-document">Non-Document</option>
                </select>
                {errors.parcelType && (
                  <p className="text-error text-sm">
                    {errors.parcelType.message}
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="label">Title</label>
                <input
                  {...register("title", { required: "Required" })}
                  type="text"
                  placeholder="Parcel Title"
                  className="input input-bordered w-full"
                />
                {errors.title && (
                  <p className="text-error text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Weight (only if non-document) */}
              {parcelType === "non-document" && (
                <div>
                  <label className="label">Weight (kg)</label>
                  <input
                    {...register("weight")}
                    type="number"
                    step="0.1"
                    placeholder="Optional"
                    className="input input-bordered w-full"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Sender Info Section */}
          <section className="bg-base-100 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Sender Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Sender Name</label>
                <input
                  {...register("senderName", { required: "Required" })}
                  // defaultValue="John Doe"
                  className="input input-bordered w-full"
                />
                {errors.senderName && (
                  <p className="text-error text-sm">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Sender Contact</label>
                <input
                  {...register("senderContact", { required: "Required" })}
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />
                {errors.senderContact && (
                  <p className="text-error text-sm">
                    {errors.senderContact.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Select Region</label>
                <select
                  {...register("senderRegion", { required: "Required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
                {errors.senderRegion && (
                  <p className="text-error text-sm">
                    {errors.senderRegion.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Select Service Center</label>
                <select
                  {...register("senderServiceCenter", { required: "Required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Center</option>
                  <option value="Center A">Center A</option>
                  <option value="Center B">Center B</option>
                  <option value="Center C">Center C</option>
                </select>
                {errors.senderServiceCenter && (
                  <p className="text-error text-sm">
                    {errors.senderServiceCenter.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Address</label>
                <input
                  {...register("senderAddress", { required: "Required" })}
                  type="text"
                  placeholder="Sender Address"
                  className="input input-bordered w-full"
                />
                {errors.senderAddress && (
                  <p className="text-error text-sm">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Pickup Instruction</label>
                <input
                  {...register("pickupInstruction", { required: "Required" })}
                  type="text"
                  placeholder="Pickup Instruction"
                  className="input input-bordered w-full"
                />
                {errors.pickupInstruction && (
                  <p className="text-error text-sm">
                    {errors.pickupInstruction.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Receiver Info Section */}
          <section className="bg-base-100 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Receiver Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Receiver Name</label>
                <input
                  {...register("receiverName", { required: "Required" })}
                  type="text"
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                />
                {errors.receiverName && (
                  <p className="text-error text-sm">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Receiver Contact</label>
                <input
                  {...register("receiverContact", { required: "Required" })}
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />
                {errors.receiverContact && (
                  <p className="text-error text-sm">
                    {errors.receiverContact.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Select Region</label>
                <select
                  {...register("receiverRegion", { required: "Required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
                {errors.receiverRegion && (
                  <p className="text-error text-sm">
                    {errors.receiverRegion.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Select Service Center</label>
                <select
                  {...register("receiverServiceCenter", {
                    required: "Required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Center</option>
                  <option value="Center A">Center A</option>
                  <option value="Center B">Center B</option>
                  <option value="Center C">Center C</option>
                </select>
                {errors.receiverServiceCenter && (
                  <p className="text-error text-sm">
                    {errors.receiverServiceCenter.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Address</label>
                <input
                  {...register("receiverAddress", { required: "Required" })}
                  type="text"
                  placeholder="Receiver Address"
                  className="input input-bordered w-full"
                />
                {errors.receiverAddress && (
                  <p className="text-error text-sm">
                    {errors.receiverAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Delivery Instruction</label>
                <input
                  {...register("deliveryInstruction", { required: "Required" })}
                  type="text"
                  placeholder="Delivery Instruction"
                  className="input input-bordered w-full"
                />
                {errors.deliveryInstruction && (
                  <p className="text-error text-sm">
                    {errors.deliveryInstruction.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-1/2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Submit Parcel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
