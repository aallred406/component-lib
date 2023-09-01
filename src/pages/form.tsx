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
} from "../components";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
`;

const choices = [
  {
    label: "Yes",
    value: "yes",
    checked: false,
  },
  {
    label: "No",
    value: "no",
    checked: false,
  },
  {
    label: "I don't know",
    value: "undecided",
    checked: false,
  },
];
const options = ["ice cream", "cake", "brownies", "fruit", "cookies"];

export type FormValues = {
  likeIt: {
    checked: boolean;
    value: string;
  };
  selection: string;
};

const FormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState<FormValues>({
    likeIt: {
      checked: false,
      value: "",
    },
    selection: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setInputs({
      ...inputs,
      likeIt: {
        checked: e.target.checked,
        value: e.target.value,
      },
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const decision = () => {
    if (inputs.likeIt.value === "yes" && inputs.likeIt.checked === true) {
      return "do ";
    }
    if (inputs.likeIt.value === "no" && inputs.likeIt.checked === true) {
      return "do not ";
    }
    return `don't know if you `;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <RadioGroup
        label="Do you like dessert?"
        handleChange={handleChange}
        state={inputs}
      >
        {choices.map((choice, i) => (
          <Radio
            key={i}
            name="dessert"
            label={choice.label}
            value={choice.value}
            checked={inputs.likeIt.value === choice.value}
          />
        ))}
      </RadioGroup>
      <Select
        label="Choose your favorite dessert:"
        options={options}
        state={inputs}
      />
      <Button type="submit">Submit</Button>
      {isOpen && (
        <Modal onModalClose={() => setIsOpen(false)}>
          <ModalHeader>
            <h2>Confirm your selection</h2>
          </ModalHeader>
          <ModalBody>
            You said you {decision()}
            like dessert. You have selected{" "}
            {inputs.selection.length > 0 ? inputs.selection : "nothing"}. Please
            confirm your order or go back to make changes.
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Go Back</Button>
            <Button
              onClick={() => {
                console.log(inputs);
                setIsOpen(false);
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </Form>
  );
};

export default FormComponent;
