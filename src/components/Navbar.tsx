import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  const linkStyle = ({isActive}:{isActive:boolean}) => ({
    padding:'0.5rem 0.75rem', borderRadius: '0.5rem', textDecoration:'none',
    color: isActive ? 'white' : '#111', background: isActive ? '#111' : 'transparent'
  })
  return (
    <header style={{borderBottom:'1px solid #eaeaea'}}>
      <nav style={{display:'flex', gap:'1rem', alignItems:'center', justifyContent:'space-between', padding:'1rem', maxWidth:'1100px', margin:'0 auto'}}>
        <Link to="/" style={{display:'flex', gap:'0.5rem', alignItems:'center', color:'#111', textDecoration:'none'}}>
          <img src="/logo.png" alt="logo" width="80" height="80" /> <strong>CodeD - Code With Dhruv</strong>
        </Link>
        <div style={{display:'flex', gap:'0.5rem'}}>
          <NavLink to="/" style={linkStyle} end>Home</NavLink>
          <NavLink to="/python" style={linkStyle}>Course</NavLink>
          <a href="mailto:dhruvjeet.2112@gmail.com" style={{padding:'0.5rem 0.75rem', textDecoration:'none', color:'#111'}}>Contact</a>
        </div>
      </nav>
    </header>
  )
}
