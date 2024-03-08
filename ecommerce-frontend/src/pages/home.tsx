import {Link} from 'react-router-dom'
import ProductCard from '../components/product-card'

const Home = () => {
  const addToCartHandler = () => {};

  return (
    <div className='home'>
      <section>

      </section>
      <h1>
        Latest Products
      <Link to={"/search"} className='findmore'>More</Link>
      </h1>
      <main>
        <ProductCard 
          productId='xyz' 
          name='Red Perl Necklace' 
          price={3500} 
          stock={50}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/71PDemSILJL._AC_SY695_.jpg" />
      </main>
    </div>
  )
}

export default Home