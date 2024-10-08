import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { categories } from '../../constants/data'
import { Link } from 'react-router-dom'

function Categories() {
  return (
    <>
        <Table sx={{
            border:"1px solid rgba(224,224,224,1)"
        }}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{fontFamily:"poppins", fontSize:15, fontWeight:700}}>
                        <Link to="/">
                        All Categories
                        </Link>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {categories.map(category=>(
                    <TableRow key={category.id} >
                        <TableCell sx={{fontFamily:"poppins",fontSize:15}}>
                            <Link to={`/?category=${category.type.toLowerCase()}`}>
                                {category.type}
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
  )
}

export default Categories