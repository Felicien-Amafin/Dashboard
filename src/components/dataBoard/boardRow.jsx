const BoardRow = ({head, children})=> {
    return <tr>
        <th scope="row">{head}</th>
        {children}
    </tr>
}

export default BoardRow;