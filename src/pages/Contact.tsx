import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Define form state type
interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  // Initialize form state
  const [formData, setFormData] = useState<FormState & { phone: string }>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // EmailJS Template Data
      const templateParams = {
        to_name: "D&N Craft Team", // Receiver Name
        from_name: formData.name, // Sender Name
        message: formData.message, // User Message
        reply_to: formData.email, // Reply to User's Email
        phone: formData.phone,
      };

      emailjs
        .send(
          "service_7heoxck", // Your EmailJS service ID
          "template_i1eiy0h", // Your EmailJS template ID
          templateParams,
          "G9fSdPsjxsDadawnX" // Your EmailJS public key
        )
        .then((response: { status: number }) => {
          console.log("Email sent successfully!", response);
          setStatusMessage("✅ Message sent successfully!");
          setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
          setErrors({});
        })
        .catch((error: unknown) => {
          console.error("Error sending email:", error);
          setStatusMessage("❌ Failed to send message. Try again!");
        });
    }
  };

  // Open Google Maps
  const handleViewOnMap = () => {
    const mapUrl = "https://maps.app.goo.gl/5hETwq2JQdRK3F5b8?g_st=iw";
    window.open(mapUrl, "_blank");
  };

  return (
    <div>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
            alt="Luxurious Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
              Let's Create Something
              <br />
              Beautiful Together
            </h1>
          </div>
        </div>
        {/* Contact Info & Form Section */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="mt-10 ml-10">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="backdrop-xl bg-orange-600  text-white border border-white/20 p-8 rounded-2xl shadow-xl relative"
            >
              {/* <img
                src="\careers\contact.jpeg"
                alt="Interior Design"
                className="absolute inset-0 w-full h-full object-cover opacity-40 rounded-2xl"
              /> */}
              <h2
                className="text-3xl font-semibold mb-6 flex items-center cursor-pointer relative z-10"
                onClick={handleViewOnMap}
              >
                {/* <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mr-2 flex items-center"
                >
                  <div className="loader"></div>
                </motion.span> */}
                Our Location
              </h2>
              <p className="mb-4 text-lg relative z-10">
                <strong>Phone:</strong> +91 9911844299
              </p>
              <p className="mb-4 text-lg relative z-10">
                <strong>Email:</strong> info@dncraft.in
              </p>
              <p className="mb-6 text-lg relative z-10">
                <strong>Address:</strong> #503, Jain Sadguru Capital Park,
                Madhapur, Hyderabad-81, Telangana, India.
              </p>
              <button
                onClick={handleViewOnMap}
                className="bg-navy text-white py-3 px-6 rounded-lg flex items-center justify-center font-semibold hover:scale-105 transition-all duration-300 relative z-10"
              >
                <img
                  src="/googlemapicon.png"
                  alt="Google Map Icon"
                  className="w-6 h-6 mr-2"
                />
                View on Map
              </button>
            </motion.div>
          </div>
          {/* Contact Form */}
          <div className=" mb-1 px-10 py-10 h-50">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-#001f3f border border-white/20 p-8 rounded-2xl shadow-xl"
            >
              <h2 className="text-3xl font-semibold  mb-6">
                📩 Send a Message
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 font-medium">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-lg  focus:ring-2 focus:ring-white bg-white/20 text-black placeholder-black/70"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-medium ">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300 rounded-lg  focus:ring-2 focus:ring-white bg-white/20  placeholder-black/70"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 font-medium">Phone No *</label>
                  <input
                    type="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 border border-gray-300 rounded-lg  focus:ring-2 focus:ring-white bg-white/20  placeholder-black/70"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-medium">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full p-3 border border-gray-300 rounded-lg h-32  focus:ring-2 focus:ring-white bg-white/20 placeholder-black/70"
                  />
                  {errors.message && (
                    <p className="text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>

                {statusMessage && (
                  <p className="text-center mt-4">{statusMessage}</p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import { motion } from "framer-motion";
// import emailjs from "@emailjs/browser";

// interface FormState {
//   name: string;
//   email: string;
//   message: string;
// }

// export default function Contact() {
//   const [formData, setFormData] = useState<FormState & { phone: string }>({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState<Partial<FormState>>({});
//   const [statusMessage, setStatusMessage] = useState<string | null>(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormState> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required.";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format.";
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message cannot be empty.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (validateForm()) {
//       const templateParams = {
//         to_name: "D&N Craft Team",
//         from_name: formData.name,
//         message: formData.message,
//         reply_to: formData.email,
//         phone: formData.phone,
//       };

//       emailjs
//         .send(
//           "service_7heoxck",
//           "template_i1eiy0h",
//           templateParams,
//           "G9fSdPsjxsDadawnX"
//         )
//         .then((response: { status: number }) => {
//           console.log("Email sent successfully!", response);
//           setStatusMessage("✅ Message sent successfully!");
//           setFormData({ name: "", email: "", phone: "", message: "" });
//           setErrors({});
//         })
//         .catch((error: unknown) => {
//           console.error("Error sending email:", error);
//           setStatusMessage("❌ Failed to send message. Try again!");
//         });
//     }
//   };

//   const handleViewOnMap = () => {
//     const mapUrl = "https://maps.app.goo.gl/jdquqvR9QqGMWywF9";
//     window.open(mapUrl, "_blank");
//   };

//   return (
//     <div className="pt-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl font-extrabold text-[#01334c] mb-4 drop-shadow-lg">
//             Get in Touch ✨
//           </h1>
//           <p className="text-[#01334c] text-lg max-w-2xl mx-auto">
//             Let's build something amazing together! Reach out for inquiries,
//             collaborations, or just to say hi. 💬
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-16 items-start">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="backdrop-xl bg bg-navy-800  text-white border border-white/20 p-8 rounded-2xl shadow-xl relative"
//           >
//             <img
//               src="public\careers\contact.jpeg"
//               alt="Interior Design"
//               className="absolute inset-0 w-full h-full object-cover opacity-40 rounded-2xl"
//             />
//             <h2
//               className="text-3xl font-semibold mb-6 flex items-center cursor-pointer relative z-10"
//               onClick={handleViewOnMap}
//             >
//               <motion.span
//                 animate={{ opacity: [1, 0.2, 1] }}
//                 transition={{ duration: 1, repeat: Infinity }}
//                 className="mr-2 flex items-center"
//               >
//                 <div className="loader"></div>
//               </motion.span>
//               Our Location
//             </h2>
//             <p className="mb-4 text-lg relative z-10">
//               <strong>Phone:</strong> +91 9911844299
//             </p>
//             <p className="mb-4 text-lg relative z-10">
//               <strong>Email:</strong> info@dncraft.com
//             </p>
//             <p className="mb-6 text-lg relative z-10">
//               <strong>Address:</strong> #503, Jain Sadguru Capital Park,
//               Madhapur, Hyderabad-81, Telangana, India.
//             </p>
//             <button
//               onClick={handleViewOnMap}
//               className="bg-navy text-white py-3 px-6 rounded-lg flex items-center justify-center font-semibold hover:scale-105 transition-all duration-300 relative z-10"
//             >
//               <img
//                 src="/googlemapicon.png"
//                 alt="Google Map Icon"
//                 className="w-6 h-6 mr-2"
//               />
//               View on Map
//             </button>
//           </motion.div>

//           <div className="w-full">
//             <img
//               src="/contact/contact.jpeg"
//               alt="Contact"
//               className="w-full h-auto rounded-2xl shadow-xl"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
