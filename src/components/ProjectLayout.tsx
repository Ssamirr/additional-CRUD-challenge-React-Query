import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

function ProjectLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default ProjectLayout