import styled from "styled-components";
import { Radio, Select } from "./components";
import { Button } from "./components/Button/button";
import { RadioGroup } from "./components/Radio";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const options = ["ice cream", "cake", "brownies", "fruit", "cookies"];

function App() {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("you submitted your dessert choices");
  };
  return (
    <>
      <h1>Dessert Menu</h1>
      <Form onSubmit={handleSubmit}>
        <RadioGroup label="Do you like dessert?">
          <Radio name="dessert" label="Yes" value="yes" />
          <Radio name="dessert" label="No" value="no" />
          <Radio name="dessert" label="I don't know" value="undecided" />
        </RadioGroup>
        <Select label="Choose your favorite dessert:" options={options} />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default App;
