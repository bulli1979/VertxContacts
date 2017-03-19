package me.contacts.data;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
public class DAOContact {
	
	private final static String DBPATH = "jdbc:sqlite::resource:contacts.db";
	private static DAOContact instance;
	/**
	 * Constructor to build a default DAOCurrency object.	
	 * 
	 */
	private DAOContact(){}
	
	
	/**
	 * Opens a connection to the local SQLite database.	
	 * 
	 * @throws SQLException		An exception that provides information on a database access error or other errors. 
	 * 
	 * @return a Connection object
	 * 
	 */
	private Connection connect() throws ClassNotFoundException {

		Connection conn = null;
		try {
			Class.forName("org.sqlite.JDBC");
			conn = DriverManager.getConnection(DBPATH);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return conn;
	}
	
	/** 
	 * Creates a DAOContact object as singleton and returns the instance.
	 * 
	 * @return DAOContact instance
	 * 
	 */
	public static DAOContact getInstance() {
		if (instance == null) {
			instance = new DAOContact();
		}
		return instance;
	}
	
	public JsonArray getContacts() throws ClassNotFoundException, SQLException{
		Connection connection = this.connect();
		String sql = "SELECT * FROM contact";
		PreparedStatement ps = connection.prepareStatement(sql);
		ResultSet resultSet = ps.executeQuery();
		JsonArray json = new JsonArray();
		while(resultSet.next()){
			JsonObject contact = new JsonObject();
			contact.put("id", resultSet.getInt("id"));
			contact.put("firstname", resultSet.getString("firstname"));
			contact.put("name", resultSet.getString("name"));
			contact.put("street", resultSet.getString("street"));
			contact.put("zip", resultSet.getString("zip"));
			contact.put("city", resultSet.getString("city"));
			json.add(contact);
		}
		ps.close();
		connection.close();
		return json;
	}
	
	/**
	 * Inserts a contact value in the database
	 * 
	 * @param contact 	Contact Object
	 */
	public JsonObject insertUpdateContact(JsonObject contact){
		try{
			Connection con = this.connect();
			int id = contact.getInteger("id");
			String sql;
			if(id>-1){
				sql = "UPDATE contact set firstname=?,name=?,street=?,zip=?,city=? WHERE id=?";
			}else{
				sql = "INSERT INTO contact (`firstname`,`name`,`street`,`zip`,`city`) 	VALUES(?,?,?,?,?)";
			}
			
			PreparedStatement ps = con.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, contact.getString("firstname"));
			ps.setString(2, contact.getString("name"));
			ps.setString(3, contact.getString("street"));
			ps.setString(4, contact.getString("zip"));
			ps.setString(5, contact.getString("city"));
			if(id>-1){
				ps.setInt(6,id);
				ps.executeUpdate();
			}else{
				ps.execute();
			}
			ResultSet generatedKeys = ps.getGeneratedKeys();
			if (generatedKeys.next()) {
                id = generatedKeys.getInt(1);
            }
			
			ps.close();
			con.close();
			JsonObject object = new JsonObject().put("id",id );
			return object;
		}catch(Exception e){
			System.out.println("Error in insertContact");
		}
		return null;
	}
	
	/**Deletes a Copntact from Databse
	 * @param id
	 */
	public void deleteContact(int id){
		try{
			Connection con = this.connect();
			String sql = "Delete FROM contact WHERE id=?";
			PreparedStatement ps = con.prepareStatement(sql);
			ps.setInt(1, id);
			ps.execute();
			ps.close();
			con.close();
		}catch(Exception e){
			System.out.println("Error in delete");
		}
	}
	
	
}
