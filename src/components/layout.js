/** @jsx jsx */
/* eslint-disable jsx-a11y/no-autofocus, react/jsx-no-target-blank */
import { jsx } from "theme-ui"
import React from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"
import { FaSearch } from "react-icons/fa"
import { useCombobox } from "downshift"
import Fuse from "fuse.js"

import * as icons from "../utils/icons"
import { rhythm } from "../utils/typography"
//import Logo from "./logo"
import MainLogo from '../../assets/aer_alfa.png'

//import SearchInput from './search.js'

function SearchInput(props) {
  const [text, setText] = React.useState("")
  const [focused, setFocused] = React.useState(false)
  const data = props.data

  const items = data.articles.nodes

  const fuse = React.useMemo(
    () =>
      new Fuse(items, {
        shouldSort: true,
        tokenize: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [
          "frontmatter.title",
          "frontmatter.description",
          "headings.value",
        ],
      }),
    [items]
  )

  const [inputItems, setInputItems] = React.useState(data.articles.nodes)

  const combobox = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(fuse.search(inputValue).map((node) => node.item))
    },
    itemToString: (node) => (node ? node.frontmatter.title : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      navigate(selectedItem.fields.slug)
    },
  })

  return (
    <div sx={{ position: "relative" }} {...combobox.getComboboxProps()}>
      <label
        htmlFor="search"
        {...combobox.getLabelProps({
          htmlFor: "search",
        })}
        sx={{
          position: "absolute",
          left: "18pt",
          top: "0",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          cursor: "text",
        }}
      >
        <FaSearch color={focused ? "#828A97" : "rgba(255,255,255,0.9)"} />
      </label>
      <input
        id="search"
        type="text"
        value={text}
        autoFocus
        onChange={(event) => setText(event.target.value)}
        placeholder={data.site.siteMetadata.texts.searchPlaceholderText}
        autoComplete="off"
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
          transition: "background .4s, box-shadow .2s",
          width: "100%",
          padding: "20px 32px 21px 56px",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          outline: "none",
          color: "searchTextColor",
          fontSize: "18px",
          lineHeight: "18px",
          borderRadius: 2,
          "&:focus": {
            backgroundColor: "white",
            boxShadow: "0 10px 20px rgba(0,0,0,0.14)",
            color: "searchTextFocusColor",
          },
          "::placeholder": {
            color: "searchTextPlaceholderColor",
          },
          "&:focus::placeholder": {
            color: "searchTextFocusPlaceholderColor",
          },
        }}
        {...combobox.getInputProps({
          id: "search",
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
        })}
      />
      <div
        {...combobox.getMenuProps()}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "calc(20px + 21px + 18px)",
          alignItems: "center",
          cursor: "text",
          background: "white",
          color: "comboboxColor",
          zIndex: 4,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          boxShadow: "0 3px 8px 0 rgba(0,0,0,0.03)",
        }}
      >
        {combobox.isOpen &&
          inputItems.map((node, index) => {
            // skip drafts and "hidden" articles (ones without a collection)
            if (!node.fields || !node.fields.collection) return null

            const icon = jsx(
              icons[node.fields.collection.icon],
              { sx: { color: "iconColor" }, size: "2rem" },
              null
            )
            return (
              <Link
                key={node.id}
                to={node.fields.slug}
                sx={{
                  display: "flex",
                  pl: 3,
                  pr: 5,
                  py: 3,
                  textDecoration: "none",
                  background:
                    combobox.highlightedIndex === index ? "#E5E5E5" : "initial",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
                {...combobox.getItemProps({ item: node, index })}
              >
                <div
                  sx={{
                    display: ["none", "flex"],
                    alignItems: "center",
                    pr: 3,
                  }}
                >
                  {icon}
                </div>
                <div sx={{ flex: "auto" }}>
                  <h3 sx={{ my: 0, fontSize: 3 }}>{node.frontmatter.title}</h3>
                  <p
                    sx={{
                      my: 0,
                      color: "articleDescriptionColor",
                      fontSize: [1, 2],
                    }}
                  >
                    {node.frontmatter.description}
                  </p>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

//class Layout extends React.Component {
function Layout(props) {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          headerTitle
          description
          texts {
            searchPlaceholderText
          }
          contact {
            sentence
          }
        }
      }
      articles: allMarkdownRemark {
        nodes {
          id
          fields {
            slug
            collection {
              icon
            }
          }
          frontmatter {
            title
            description
          }
          headings {
            # depth
            value
          }
          # excerpt(format: PLAIN)
        }
      }
    }
  `)

  const { location, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
    
  /* const contactIcon = jsx(
    icons[contact.icon],
    { sx: { color: "iconColor" } },
    null
  ) */
    
  return (
    <div>
      <div
        sx={{
          py: 3,
          color: "headerText",
          backgroundColor: "headerBackground",
        }}
      >
        <header
          sx={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
            px: [2, 4],
            pt: 4,
            pb: 2,
          }}
        >
          <div sx={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
          }}>
            <h3
              sx={{
                mt: 0,
                mb: 3,
              }}
            >
              <Link
                sx={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `logoColor`,
                  "&:hover": {
                    textDecoration: "none",
                    color: "logoColor",
                  },
                }}
                to={`/`}
              >
              <img src={MainLogo} alt="logo" sx={{marginBottom:0, width:90, height:90}}/>
              </Link>
            </h3>
            <h1 sx={{ 
              color: "iconColor"
              }}
            >
              {data.site.siteMetadata.headerTitle}
            </h1>
          </div>
          { location.pathname === rootPath && 
            <>
            <div sx={{ pt: 2, pb: 2, mb: 2, mt: 2, fontSize: [2, 3] }}>
              {data.site.siteMetadata.description}&nbsp;
            </div>         
            <div sx={{ pt: 2, pb: 2, mb: 2, mt: 2, fontSize: [2, 3] }}>
              <Link to="/contacto/">
                {data.site.siteMetadata.contact.sentence}
              </Link>
            </div>
            </>        
          }
          {/* 
          <SearchInput data={data}/>
           */}
        </header>
      </div>
      <div
        style={{
          background: "#F3F5F7",
        }}
      >
        <main
          sx={{
            mx: `auto`,
            maxWidth: rhythm(30),
            px: [2, 4],
            py: [3],
          }}
        >
          {children}
        </main>
      </div>
      <footer
        sx={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          textAlign: "center",
          color: "footerTextColor",
          fontSize: 1,
        }}
      >
        <div
          sx={{              
            verticalAlign: 'center',
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: ["flex-start", "center"]
          }}
        >
          <Link
            sx={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `logoColor`,
              "&:hover": {
                textDecoration: "none",
                color: "logoColor",
              },
            }}
            to={`/`}
          >
            <img src={MainLogo} alt="logo" sx={{marginBottom:0, width:90, height:90}}/>
          </Link>
          <div
            sx={{
              marginLeft: `40px`,
            }}
          >
            <Link to="/contacto/" 
            >Contactar</Link>
          </div>
        </div>
        <div sx={{ mt: 2 }}>
          Built with
          {` `}
          {/*
            PLEASE DO NOT REMOVE THIS LINK.

            A lot of unpaid time is spent on making and maintaining the 
            center. Nothing is expected in return. Keeping this link here
            is the only small thing asked in return. So please don't remove it.

            You are amazing for keeping it here, thank you.
          */}
          <a
            href="https://help.dferber.de"
            target="_blank"
            sx={{
              color: "footerTextColor",
              textDecoration: "underline",
              "&:hover": {
                color: "footerTextHoverColor",
              },
            }}
          >
            Dom's Help Center
          </a>
          . Patrocinado por {` `}
          <a
            href="https://www.youtube.com/channel/UCNwhHxz-xUv07Xq8O9IqxVg"
            target="_blank"
          >
            Razón o fe
          </a>
          .
        </div>
      </footer>
    </div>
  )

}

export default Layout
