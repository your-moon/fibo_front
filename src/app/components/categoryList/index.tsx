import { Button } from "@nextui-org/react";
import { Category } from "../posts";

interface CategoryListProps {
  selectedCategory: number | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>;
  categories: Category[] | undefined;
}

export const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) => {
  if (!categories) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-row gap-2 mb-5 w-9/12">
      {categories.map((category) => (
        <Button
          key={category.Id}
          size="sm"
          radius="full"
          color={selectedCategory === category.Id ? "success" : "default"}
          onPress={() =>
            setSelectedCategory(
              selectedCategory === category.Id ? null : category.Id,
            )
          }
        >
          {category.Name}
        </Button>
      ))}
    </div>
  );
};
