import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout"
import SEO from "../components/seo"

//class ContactPage extends React.Component {
export default function ContactPage(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: ""
  });
  const [name, setName] = React.useState("Tu nombre")
  const [email, setEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const setters = {
    name: setName,
    email: setEmail,
    subject, setSubject
  }

  const handleSubmit = (event) => {
    const url = data.site.siteMetadata.contact.formUrl
    setForm({name, email, subject})
    alert(JSON.stringify(form))
    event.preventDefault()
  }

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const setter = setters[event.target.name]
    if (setter) {
      setter(value)
    }
  }

  return (
    <Layout location={props.location} >
      <SEO title="Contacto" />
      <h1>Formulario de contacto</h1>
      <p>{data.site.siteMetadata.contact.sentence}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" value={name} onChange={handleChange}></input>
        </label>
        <input type="submit" value="Enviar" />
      </form>
      <h3>Data</h3>
      {JSON.stringify(form)}
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        headerTitle
        contact {
          formUrl
          sentence
        }
      }
    }
  }
`
