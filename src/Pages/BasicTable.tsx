import React, { useMemo} from "react";
import {useTable} from "react-table";
import dummyData from "./DataConstants/clientDb.json";
import {COLUMNS} from "../Pages/Columns"
import { Navigate } from "react-router-dom";
export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => dummyData, [])
    const tableInstance = useTable({
        columns,
        data
    })

    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    } = tableInstance;

    return (
        <table{...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroups) => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    </tr>
                  )
                })}
            </tbody>
        </table>
    )
}