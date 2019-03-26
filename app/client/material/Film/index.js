import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default function Film (props) {
  const { film } = props
  const { isFiction, isEnglishLanguage, name } = film
  const descriptor = `${isEnglishLanguage ? 'English' : 'Foreign'} language ${isFiction ? 'fiction' : 'documentary'}`

  return (
    <ListItem>
      <ListItemText
        primary={name}
        secondary={descriptor}
      />
    </ListItem>
  )
}
