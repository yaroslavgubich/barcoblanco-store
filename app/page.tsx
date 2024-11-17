import React from 'react'

const Home = () => {
  return (
<>

Hero Banner

<div className='products-heading'>
<h2>Popular Products</h2>
</div>

<div className="procuts-container">
  {['product 1', 'product 2'].map((product)=>product)}
</div>
      Footer



    </>
  )
}

export default Home
