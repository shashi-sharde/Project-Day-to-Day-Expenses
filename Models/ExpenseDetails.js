const Sequelize = require('sequelize')

const sequelize = require('../utill/database')

const Expense = sequelize.define('expenses',{
 id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
 },
 MoneySpent: {
    type: Sequelize.INTEGER,
    allowNull: false
 },
 Description: {
    type: Sequelize.STRING,
    allowNull: false
 },
 Categories: {
    type: Sequelize.STRING,
    allowNull: false,
 }     
})

module.exports = Expense