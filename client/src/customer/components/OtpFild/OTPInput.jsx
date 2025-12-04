// import React, {
//   useState,
//   useEffect,
//   ChangeEvent,
//   KeyboardEvent,
//   ClipboardEvent,
//   FocusEvent,
// } from "react";

// interface OTPInputProps {
//   length: number;
//   onChange: (otp: string) => void;
//   error?: boolean;
// }

// const OTPInput: React.FC<OTPInputProps> = ({ length, onChange, error = false }) => {
//   const [otp, setOtp] = useState<string[]>(Array(length).fill(""));

//   // Send OTP to parent
//   useEffect(() => {
//     onChange(otp.join(""));
//   }, [otp, onChange]);

//   // Focus first input on mount
//   useEffect(() => {
//     const first = document.getElementById("otp-0") as HTMLInputElement;
//     first?.focus();
//   }, []);

//   // Change value
//   const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < length - 1) {
//         const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
//         next?.focus();
//       }
//     }
//   };

//   // Handle backspace
//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
//       prev?.focus();
//     }
//   };

//   // Handle paste
//   const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
//     const newOtp = [...otp];
//     paste.split("").forEach((char, i) => newOtp[i] = char);
//     setOtp(newOtp);

//     const focusIndex = Math.min(paste.length, length - 1);
//     const next = document.getElementById(`otp-${focusIndex}`) as HTMLInputElement;
//     next?.focus();
//   };

//   // Select input text on focus
//   const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
//     e.target.select();
//   };

//   return (
//     <div className="flex gap-2 justify-center flex-wrap">
//       {otp.map((digit, index) => (
//         <input
//           key={index}
//           id={`otp-${index}`}
//           type="text"
//           inputMode="numeric"
//           maxLength={1}
//           value={digit}
//           onChange={(e) => handleChange(e, index)}
//           onKeyDown={(e) => handleKeyDown(e, index)}
//           onPaste={handlePaste}
//           onFocus={handleFocus}
//           className={`
//             w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
//             text-center font-semibold
//             text-lg sm:text-xl md:text-2xl
//             border-2 rounded-lg
//             ${error
//               ? "border-red-500 focus:border-red-600 focus:ring-red-200"
//               : "border-gray-300 focus:border-teal-500 focus:ring-teal-200"
//             }
//             focus:outline-none focus:ring-2 transition-all duration-200
//             bg-white
//           `}
//         />
//       ))}
//     </div>
//   );
// };

// export default OTPInput;
