import { useEffect, useRef } from 'react';

export function getSectionListData(data) {
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items.
  // Each item has the following properties: "id", "title" and "price"

  let sections = data.map((item) => item.category);

  // make the sections unique
  sections = [...new Set(sections)];
  console.log('🚀 ~ getSectionListData ~ sections:', sections);

  const fullData = sections.map((section) => {
    const tempData = data
      .filter((item) => item.category === section)
      .map(({ id, name, price, description, image }) => ({
        id,
        name,
        price,
        description,
        image,
      }));

    return {
      name: section,
      data: tempData,
    };
  });

  return fullData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
