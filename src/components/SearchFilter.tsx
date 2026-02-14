import { Form, InputGroup } from "react-bootstrap";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchFilter = ({ value, onChange }: SearchFilterProps) => {
  return (
    <Form.Group className="mb-2">
      <InputGroup size="sm">
        <Form.Control
          type="text"
          placeholder="Search globally..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputGroup>
    </Form.Group>
  );
};

export default SearchFilter;
