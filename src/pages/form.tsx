import styled from "styled-components";
import {
  Modal,
  Radio,
  Select,
  Button,
  RadioGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FooterCloseBtn,
} from "../components";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
`;

const options = ["ice cream", "cake", "brownies", "fruit", "cookies"];

type FormValues = {
  likeIt: {
    label: string;
    checked: boolean;
  };
  selection: string;
};

const FormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState<FormValues>({
    likeIt: {
      label: "",
      checked: false,
    },
    selection: "",
  });
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      likeIt: { label: inputs.likeIt.label, checked: true },
      selection: inputs.selection,
    });
    setIsOpen(!isOpen);
    console.log("you submitted your dessert choices");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <RadioGroup label="Do you like dessert?">
        <Radio name="dessert" label="Yes" value="yes" />
        <Radio name="dessert" label="No" value="no" />
        <Radio name="dessert" label="I don't know" value="undecided" />
      </RadioGroup>
      <Select label="Choose your favorite dessert:" options={options} />
      <Button type="submit">Submit</Button>
      {isOpen && (
        <Modal onModalClose={() => setIsOpen(false)}>
          <ModalHeader>
            <h2>Confirm your selection</h2>
          </ModalHeader>
          <ModalBody>
            `You have selected ${inputs.selection}. Please confirm your order.`
          </ModalBody>
          <ModalFooter>
            <FooterCloseBtn>Confirm</FooterCloseBtn>
          </ModalFooter>
        </Modal>
      )}
    </Form>
  );
};

export default FormComponent;
