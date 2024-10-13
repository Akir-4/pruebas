import React from 'react'

const UserLogo = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-3'>
            <img src="https://th.bing.com/th/id/OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH?rs=1&pid=ImgDetMain"
                alt="user"
                className="w-[60px] h-[60px] rounded-full border-solid border-2 " />
            <p>UserName</p>
        </div>
    )
}

export default UserLogo
