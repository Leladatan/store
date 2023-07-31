import { SignIn } from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Store E-COM: sign-in',
    description: 'Store E-COM desc: sign-in',
};

const SignInPage = () => {
    return <SignIn />;
};

export default SignInPage;
