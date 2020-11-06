export const positionOptionsElement = (ul: HTMLUListElement) => {
    const section = ul?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
    const ulBottom = ul?.getBoundingClientRect().top + ul.offsetHeight + 70
    const sectionBottom = (section?.getBoundingClientRect()?.top || 0) + (section?.offsetHeight || 0)

    if(ulBottom > sectionBottom)
        ul.style.bottom = '20px'
}