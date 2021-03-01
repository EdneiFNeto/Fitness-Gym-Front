const formaterNumber = (number) => {
  const num = Number(number).toFixed(2)
  return String(num).replace(".", ",")
}

export { formaterNumber }
