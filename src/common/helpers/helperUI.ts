export const positionOptionsElement = (ul: HTMLUListElement) => {
    const section = ul?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
    const ulBottom = ul?.getBoundingClientRect().top + ul.offsetHeight + 70
    const sectionBottom = (section?.getBoundingClientRect()?.top || 0) + (section?.offsetHeight || 0)

    if(ulBottom > sectionBottom)
        ul.style.bottom = '20px'
}

export function nowPlayingPositionDropdown(ul: HTMLUListElement){
    const nowPlayingRight = ul.parentElement?.parentElement?.parentElement?.getBoundingClientRect().right || 0
    const ulRight = ul.getBoundingClientRect().right
    const difference = ulRight - nowPlayingRight
    
    if(difference >= 0){
        ul.style.right = `10px`
    }
}