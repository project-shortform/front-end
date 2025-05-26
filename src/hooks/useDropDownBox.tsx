import { useState } from 'react'

const useDropDownBox = () => {
  const [isClickedFilter, setIsClickedFilter] = useState(false)
  const [selectedFilterContent, setSelectedFilterContent] = useState<string>('')

  return {
    isClickedFilter,
    selectedFilterContent,
    setIsClickedFilter,
    setSelectedFilterContent,
  }
}
export default useDropDownBox
