import { SignUp } from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Store E-COM: sign-up',
    description: 'Store E-COM desc: sign-up',
};

const SignUpPage = () => {
    return <SignUp />;
};

export default SignUpPage;
