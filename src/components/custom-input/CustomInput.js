import React from "react";
import { Form } from "react-bootstrap";

function CustomInput({label,...rest}) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </Form>
  );
}

export default CustomInput;
