import React from 'react'
import Feeds from './Feeds'
import RightCompo from './RightCompo'
import SendInput from './SendInput'
import Sidecompo from './Sidecompo'


const Maincom = () => {

 
  
  return (
    <div className='mt-8 w-full'>
        
        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 w-11/12 mx-auto'>

{/*Side components*/}
<section className='col-span-1 lg:col-span-2   hidden md:block '>
<Sidecompo/>
</section>

{/*Middle components*/}
<section className='col-span-3 flex flex-col space-y-4 '>
<SendInput/>

<Feeds/>
</section>
{/*Right components*/}
<section className='col-span-2 hidden lg:block'>
<RightCompo/>
</section>
        </div>

    </div>
  )
}

export default Maincom