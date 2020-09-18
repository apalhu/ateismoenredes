
//import { jsx } from "theme-ui"
import React from 'react'
import {
  Box,
  Button,
  Label,
  Input,
  Textarea,
} from 'theme-ui';

/* https://theme-ui.com/components/forms */
export default (props) => (
  <Box>
    <form name="AER-Contacto v1"
      method="post"
      onSubmit="submit"
      data-netlify="true"
      data-netlify-honeypot="areusure"
      action="/contactok/"
    >
      {/* https://www.netlify.com/products/forms */}
      <input type="hidden" name="form-name" value="AER-Contacto v1" />
      <p hidden>
        <label>
          Seguro?: <input name="areusure" />
        </label>
      </p>
      <Label htmlFor='name'>Nombre</Label>
      <Input required
        name='name'
        id='name'
        mb={2}
      />
      <Label htmlFor='email'>Email</Label>
      <Input required
        name='email'
        id='email'
        mb={3}
      />
      <Label htmlFor='info'>Texto</Label>
      <Textarea required
        name='info'
        id='info'
        rows='6'
        mb={3}
      />
      <Button variant="primary">
        Submit
      </Button>
    </form>
  </Box>
)

