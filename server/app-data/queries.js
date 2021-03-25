/**
  *
  
 *
 * Centralized queries required for various endpoints
 */
module.exports = {
  getProducts: 'SELECT * FROM foodify.Item',
  getCategories: 'SELECT * FROM foodify.Category',
  getEmployee: `SELECT
    user.phone,
    user.FirstName,
    user.LastName,
    user.Email,
    user.RoleId,
    role.RoleName
FROM
    User AS user,
    Role AS role
WHERE
    role.RoleId = user.RoleId
        AND user.RoleId != 3`,
  deleteUserRole: 'update User SET RoleId = 3 where Email = ? and RoleId = ?',
  addUserRole: 'update User SET RoleId = ? where FirstName = ?',
  getOrders:
    "SELECT orderId,Email,DATE_FORMAT(Order.OrderDate,'%M %d %Y') as 'OrderDate',DATE_FORMAT(Order.DeliveredDate,'%M %d %Y') as 'DeliveredDate',UCASE(Status) as 'Status',DATE_FORMAT(Order.PickUpSlot,'%M %d %Y, %h:%m:%S %p') as PickUpSlot FROM foodify.Order;", //need to update with bannerId in where clause
  getOrdersByBannerId:
    "SELECT orderId,Email,DATE_FORMAT(Order.OrderDate,'%M %d %Y') as 'OrderDate',DATE_FORMAT(Order.DeliveredDate,'%M %d %Y') as 'DeliveredDate',UCASE(Status) as 'Status',DATE_FORMAT(Order.PickUpSlot,'%M %d %Y, %h:%m:%S %p') as PickUpSlot FROM foodify.Order where Email=?;", //need to update with bannerId in where clause
  getOrder:
    'SELECT Order.OrderId,Item.ItemName,OrderDetails.ItemQuantity,Order.OrderDate,Order.DeliveredDate,Order.status,Order.PickUpSlot,Order.total,Item.price,Category.CategoryName,OrderDetails.ItemId FROM foodify.OrderDetails,foodify.Order,foodify.Item,foodify.Category where Order.OrderId=OrderDetails.OrderId and OrderDetails.ItemId=Item.ItemId and Item.CategoryId=Category.CategoryId and Order.OrderId=?;',
  deletecart: 'DELETE FROM foodify.Cart where Email=?',
  updatetotal: 'UPDATE `foodify`.`Order` SET `total` = ? WHERE `OrderId`=?;',
  orderStatusUpdate: 'UPDATE `foodify`.`Order` SET `Status` = ? WHERE `OrderId` = ?;',
  setOrderDeliveredDate: 'UPDATE `foodify`.`Order` SET `DeliveredDate` = current_date() WHERE `OrderId` = ?;',
  getCategories: 'SELECT * FROM foodify.Category',
  createUser: 'INSERT INTO foodify.User(Phone,FirstName,LastName,Password,Email,RoleId) VALUES (?,?,?,?,?,?)',
  getRoles: 'SELECT * FROM foodify.Role',
  resetPassword: `UPDATE foodify.User SET token=? WHERE User.Email = ?;`,
  removeToken: `UPDATE foodify.User SET token=null WHERE User.Email = ?;`,
  getResetToken: `SELECT token FROM foodify.User WHERE User.Email = ?;`,
  updatePassword: `UPDATE foodify.User SET Password=? WHERE User.Email = ?;`,

  createProduct:
    'INSERT INTO `foodify`.`Item` (`ItemName`,`ItemDescription`,`CategoryId`,`AvailableQuantity`,`ItemLimit`,`price`) VALUES (?,?,?,?,?,?);',
  updateProduct:
    'UPDATE `foodify`.`Item` SET `ItemName` = ?,`ItemDescription` = ?,`CategoryId` = ?,`AvailableQuantity` = ?,`ItemLimit` = ? , `price` = ? WHERE `ItemId` = ?;',
  createOrder: `INSERT INTO foodify.Order (Email,OrderDate,Status,PickUpSlot) VALUES (?,?,?,?)`,
  createOrderdetails: `INSERT INTO foodify.OrderDetails (OrderId,ItemId,ItemQuantity) VALUES (?,?,?)`,
  fetchOrderId: `SELECT OrderId FROM foodify.Order where Email= ? ORDER BY OrderId DESC LIMIT 1;`,
  getProducts: `SELECT *
    FROM
    foodify.Item as I
      LEFT JOIN
    foodify.Category as C
    ON I.CategoryId = C.CategoryId
    ORDER BY I.ItemId`,
  addCategory: 'INSERT INTO `foodify`.`Category` (`CategoryName`) VALUES (?);',
  updateCategory: 'UPDATE `foodify`.`Category` SET `CategoryName` = ? WHERE `CategoryId` = ?;',
  getProductById: `SELECT *
    FROM
    foodify.Item as I
      LEFT JOIN
    foodify.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE ItemId = ?`,
  getProductsByName: `SELECT *
    FROM
    foodify.Item as I
      LEFT JOIN
    foodify.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE ItemName LIKE ?
    ORDER BY I.ItemId`,
  getProductsByCategory: `SELECT *
    FROM
    foodify.Item as I
      LEFT JOIN
    foodify.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE I.CategoryId IN (`,
  getProductsByNameAndCategory: `SELECT *
    FROM
    foodify.Item as I
      LEFT JOIN
    foodify.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE ItemName LIKE ? AND I.CategoryId IN (`,
  deleteProduct: `DELETE FROM foodify.Item WHERE ItemId = ?;`,
  //signIn: '',
  getRole: 'SELECT * FROM foodify.Role',
  getStudent: 'select * from User where RoleId = 3',
  signIn: `SELECT * from foodify.User where Email = ? ;`,
  getCartProducts: `SELECT *
    FROM foodify.Cart as C LEFT JOIN foodify.Item as I
    ON C.ItemId = I.ItemId
    LEFT JOIN foodify.Category as Ca
    ON I.CategoryId = Ca.CategoryId
    where C.email= ? AND C.Status='false'`,
  addProductToCart: `INSERT INTO foodify.Cart Values (?, ?, ?, ?)`,
  deleteProductFromCart: `DELETE FROM foodify.Cart WHERE ItemId = ? AND Email = ? AND Status = 'true'`,
  isProductAvailableInCart: `SELECT * FROM foodify.Cart WHERE ItemId = ? AND Email = ? AND Status = 'true'`,
  postContactUsMessage: `insert into ContactUs (FirstName, Email, Message) values( ?, ?, ?)`,
  getUser: `SELECT * FROM foodify.User where Email = ?`,
  updateUser: `UPDATE foodify.User
    SET FirstName = ?, LastName = ?, Email = ?
    WHERE Email = ?`,
};
