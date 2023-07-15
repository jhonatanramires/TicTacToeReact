/* eslint-disable react/prop-types */
export const Square = ({index, isSelected, updateBoard, children})=>{
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = ()=>{
      updateBoard(index)
    }
  
    return(
      <div className={className} onClick={handleClick} >
        {children}
      </div>
    );
}