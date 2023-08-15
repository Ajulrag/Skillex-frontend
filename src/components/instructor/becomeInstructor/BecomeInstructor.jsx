import "./becomeinstructor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { instructorSignUpSchema } from "../../../formSchemas/userAuthSchema";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import PrivateRoutes from "../../PrivateRoute";

const BecomeInstructor = ({ onClose, onSubmit }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const signUpInitials = {
    experience_years: "",
    field_of_study: "",
  };

  const signUpFormik = useFormik({
    initialValues: signUpInitials,
    validationSchema: instructorSignUpSchema,

    onSubmit: async (values) => {
      try {
        console.log(userToken, "tok");
        const response = await axios.put(
          "/instructor/signup",
          {
            ...values,
          },
          // {
          //   credentials: true,
          // },
          {
            headers: {
              autherization: `${userToken}`, 
            },
          }
        );

        console.log(response);

        if (response.data.code === 200) {
          console.log("Working!");
          navigate("/instructor");
          
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.log(error);
        toast.error("Server Error");
      }
    },
  });

  return (
    <PrivateRoutes>
    <div className="overlay min-h-screen top-0 left-0 fixed flex items-center justify-center bg-gray-900">
      <div className="overlay-content bg-white max-w-[30rem] shadow-lg rounded-lg p-8 w-full sm:w-96 relative flex flex-col items-center">
        <h2 className="text-center text-2xl font-bold mb-4">
          Become an Instructor
        </h2>
        <form className="flex flex-col" onSubmit={signUpFormik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="experience_years" className="block mb-2">
              Years of Experience:
            </label>
            <input
              type="number"
              id="experience_years"
              name="experience_years"
              onChange={signUpFormik.handleChange}
              value={signUpFormik.values.experience_years}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="field_of_study" className="block mb-2">
              Field of Study:
            </label>
            <input
              type="text"
              id="field_of_study"
              name="field_of_study"
              onChange={signUpFormik.handleChange}
              value={signUpFormik.values.field_of_study}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <button
              id="bi"
              type="submit"
              className="rounded-md hover:bg-blue-700 btn"
            >
              Submit
            </button>
            <button
              id="close"
              className="rounded-md hover:bg-blue-700 ml-16 btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </PrivateRoutes>
  );
};

export default BecomeInstructor;
