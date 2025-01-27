
import Button from '../../ui/Button'
import { StatItem } from './StatItem'
import Arrow from '../../icons/Arrow'
import { motion } from 'framer-motion'
function LandingPage() {
  return (
    <>
      <div>
        <div className='flex  flex-col gap-y-2.5 justify-center items-center h-[80vh]'>
          <h1 className='text-white text-7xl text-center font-bold'>Delicious Food</h1>
          <h1 className='text-[#3498db] text-7xl text-center font-bold'>Delivered to your Door</h1>
          <p className='text-[#d1d5db] text-center text-2xl'>Experience the finest cuisine from local restaurants, delivered fresh<br/>hot to your doorstep.</p>
          <div className='flex gap-x-5 mt-12'>
          <Button onHoverColor="white"  onHoverTextColor='black  ' text='Order Now' bgColor='#3498db' width='150px' height='50px' textsize='20px' textcolor='white' />
          <Button onHoverColor="#3498db" borderSize='2px' onHoverTextColor='white' borderColor='#3498db' text='Learn More' bgColor='black' width='150px' height='50px' textsize='20px' textcolor='white' />
          </div>
          <div className='flex justify-center gap-x-10 mt-10'>
          <StatItem number='100' label='Restaurants+'/>
          <StatItem number='500' label='Delivery+'/>
          <StatItem number='1000' label='Customers+'/>
            
          </div>
          
        </div>
        <motion.div className='flex justify-center' animate={{ y: [0, -30, 0] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <Arrow/>
          </motion.div>
      </div>
    </>
  )
}

export default LandingPage