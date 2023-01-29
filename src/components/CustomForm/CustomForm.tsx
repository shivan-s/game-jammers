import { Form } from "formik";
import Box from "../Box";
import Button from "../Button";
import { type ICustomForm } from "./interface";

const CustomForm = ({ buttonText, children }: ICustomForm) => {
  return (
    <Form>
      <Box>
        {children}
        <Button type="submit" isPrimary>
          {buttonText || "Submit"}
        </Button>
      </Box>
    </Form>
  );
};

export default CustomForm;
