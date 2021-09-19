// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const hello = async (req, res) => {
  console.log({req})
  console.log({res});
  res.status(200).json({ name: 'John Doe' })
}

export default hello
