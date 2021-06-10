Prioritiy Search trees gives you the data points at the upper and lower end of any range. They may not be optimized for searching text. Time will need to be spent building the trees, so the trees must be in place before queries are made. It might take time to search the tree, unless it can be held in memory, then the time spent searching it will be negligible, compared to searching a row-based database.

Wikipedia: https://en.wikipedia.org/wiki/Priority_search_tree

```clang
tree construct_tree(data) {
  if length(data) > 1 {
  
    node_point = find_point_with_minimum_priority(data) // Select the point with the lowest priority
    
    reduced_data = remove_point_from_data(data, node_point)
    node_key = calculate_median(reduced_data) // calculate median, excluding the selected point
    
    // Divide the points 
    left_data = []
    right_data = []    
   
    for (point in reduced_data) {
      if point.key <= node_key
         left_data.append(point)
      else
         right_data.append(point)
    }

    left_subtree = construct_tree(left_data)
    right_subtree = construct_tree(right_data)

    return node // Node containing the node_key, node_point and the left and right subtrees

  } else if length(data) == 1 {
     return leaf node // Leaf node containing the single remaining data point
  } else if length(data) == 0 {
    return null // This node is empty
  }
}
```
