/** @jsx jsx */
import { jsx } from 'theme-ui'
//import React from "react";
import Layout from "../components/layout"

//class ContactPage extends React.Component {
export default function ContactPage(props) {
  
  return (
    <Layout location={props.location} >

      <h3>El formulario ha sido enviado correctamente.</h3>
      <div sx={{
        mt:20,
        textAlign:'center'}}
      >
        <h2>
          Gracias por tu interés
        </h2>
      </div>
      
    </Layout>
  );
}

