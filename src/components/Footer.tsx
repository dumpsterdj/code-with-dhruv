export default function Footer(){
  return (
    <footer style={{borderTop:'1px solid #eaeaea'}}>
      <div style={{padding:'1rem', maxWidth:'1100px', margin:'0 auto', fontSize:'0.9rem', color:'#666'}}>
        © {new Date().getFullYear()} CodeD - Code With Dhruv
      </div>
    </footer>
  )
}
