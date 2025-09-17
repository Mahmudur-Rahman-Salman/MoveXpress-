import rider1 from "../../assets/delivery rider.jpg";
import rider2 from "../../assets/delivery rider2.png";
import customer from "../../assets/cutomer.png";

const benefits = [
  {
    id: 1,
    image: rider1,
    title: "Safe & Reliable",
    description:
      "Every package is handled with care using secure packaging and trusted delivery partners to ensure it arrives safely.",
  },
  {
    id: 2,
    image: rider2,
    title: "Real-time Tracking",
    description:
      "Stay updated at every step with live parcel tracking, so you always know where your delivery is.",
  },
  {
    id: 3,
    image: customer,
    title: "24/7 Customer Support",
    description:
      "Our friendly support team is available round-the-clock to help you with queries, updates, and delivery concerns.",
  },
];

const Benifits = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>

        <div className="flex flex-col gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="w-full bg-base-200 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6"
            >
              {/* Left circular image */}
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-base-content/70">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benifits;
