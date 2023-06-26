'use client'

import { FC } from "react";
import ThankYou from '@/app/_components/ThankYou'
import Stats from '@/app/_components/Stats'

const Page:FC<{}> = () => {
  return (
    <>
      <ThankYou>
        <Stats />
      </ThankYou>
    </>
  )
}

export default Page;
