state = {
  input: ""
} 
handleInput = (event) => {
   event.persist()
   this.setState({
     input: event.target.value
   })
}