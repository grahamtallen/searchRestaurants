Assumptions

- The number of rows on each table is unbounded.
- The response times need to scale linearly at the least.
- Each parameter can contain only one value.
- Only return the 5 Best Matches.
- Code is clean, readable, testable, robust, performant, and maintainable.

Best Matches

“Best match” is defined as below:
    A Restaurant Name match is defined as an exact or partial String match with what users provided. For example, “Mcd” would match “Mcdonald’s”.
    A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. For example, “3” would match all the 3 stars restaurants plus all the 4 stars and 5 stars restaurants.
    A Distance match is defined as a Distance equal to or less than what users have asked for. For example, “2” would match any distance that is equal to or less than 2 miles from your company.
    A Price match is defined as a Price equal to or less than what users have asked for. For example, “15” would match any price that is equal to or less than $15 per person.
    A Cuisine match is defined as an exact or partial String match with what users provided. For example, “Chi” would match “Chinese”. You can find all the possible Cuisines in the cuisines.csv file. You can assume each restaurant offers only one cuisine.
    The five parameters are holding an “AND” relationship. For example, if users provide Name = “Mcdonald’s” and Distance = 2, you should find all “Mcdonald’s” within 2 miles.
    When multiple matches are found, you should sort them as described below.
        Sort the restaurants by Distance first.
        After the above process, if two matches are still equal, then the restaurant with a higher customer rating wins.
        After the above process, if two matches are still equal, then the restaurant with a lower price wins.
        After the above process, if two matches are still equal, then you can randomly decide the order.
            Example: if the input is Customer Rating = 3 and Price = 15. Mcdonald’s is 4 stars with an average spend = $10, and it is 1 mile away. And KFC is 3 stars with an average spend = $8, and it is 1 mile away. Then we should consider Mcdonald’s as a better match than KFC. (They both matches the search criteria -> we compare distance -> we get a tie -> we then compare customer rating -> Mcdonald’s wins)

Testing

Queries should return expected results.

Readablility

Install modern prettier

Robust

Works in such a way that if other services fail, it reports correctly

Maintainability


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
