import { Form } from "formik";
import { type PropsWithChildren } from "react";
import Button from "../Button";

const CustomForm = ({ children }: PropsWithChildren) => {
  return (
    <Form className="flex flex-col gap-2 rounded bg-stone-700 px-4 py-4">
      {children}
      <Button type="submit" isPrimary>
        Submit
      </Button>
    </Form>
  );
};

export default CustomForm;
