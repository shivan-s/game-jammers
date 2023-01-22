import { Form } from "formik";
import { type PropsWithChildren } from "react";
import Button from "../Button";

interface ICustomForm extends PropsWithChildren {
  buttonText?: string;
}

const CustomForm = ({ buttonText, children }: ICustomForm) => {
  return (
    <Form className="flex flex-col gap-2 rounded bg-stone-700 px-4 py-4">
      {children}
      <Button type="submit" isPrimary>
        {buttonText || "Submit"}
      </Button>
    </Form>
  );
};

export default CustomForm;
