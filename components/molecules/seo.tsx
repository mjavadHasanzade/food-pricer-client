import React, { FC } from 'react'
import Head from 'next/head'

interface ISeo {
    title: string,
    chidren?: any,
    favicon?: string
}

const Seo: FC<ISeo> = ({ title, children, favicon = '/favicon.ico' }) => {
    return (
        <Head>
            <title>{title}</title>
            {children}
            <link rel="icon" href={favicon} />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.1/css/bootstrap-reboot.min.css" integrity="sha512-ioOlrrQQ3fZN/A7N2rZVm6JXp/Lg7xtda9OaRKornjBcuTW/UqIhTlPyngcGQGrQTOhJgmSltKM4v3Ne03WPug==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.1/css/bootstrap-grid.min.css" integrity="sha512-Xj2sd25G+JgJYwo0cvlGWXoUekbLg5WvW+VbItCMdXrDoZRWcS/d40ieFHu77vP0dF5PK+cX6TIp+DsPfZomhw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </Head>
    )
}

export default Seo;