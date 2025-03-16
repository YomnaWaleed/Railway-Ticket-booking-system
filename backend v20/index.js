const express = require('express');
const app = express();
const { Connection, Request, TYPES  } = require('tedious');
const cors = require("cors");
app.use(cors());

const config = {
    authentication: {
      type: 'default',
      options: {
        userName: 'yomnawaleed',
        password: 'wywy2022'
      }
    },
    server: 'YOMNAWALEED2002',
    options: {
      database: 'RailwayTrain',
      encrypt: true, // For secure connections
      trustServerCertificate: true // Change to false on production
    }
  };

const connection = new Connection(config);



// Connect to SQL Server
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to SQL Server:', err);
    } else {
      console.log('Connected to SQL Server');
    }
});


// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define your API routes
app.use(express.json());

app.post("/book", async (req, res) => {
  try {
    const {
      RNR_no_tik_pay,
      userID,
      train_no,
      passenger_name,
      source,
      distination,
      seat_no,
      transaction_id,
      Amount,
      bank,
      card_no,
    } = req.body;

    if (
      RNR_no_tik_pay === undefined ||
      userID === undefined ||
      train_no === undefined ||
      passenger_name === undefined ||
      source === undefined ||
      distination === undefined ||
      seat_no === undefined ||
      transaction_id === undefined ||
      Amount === undefined ||
      bank === undefined ||
      card_no === undefined
    ) {/*
      console.log(RNR_no_tik_pay);
      console.log(userID);
      console.log(train_no);
      console.log(passenger_name);
      console.log(source);
      console.log(distination);
      console.log(seat_no);
      console.log(transaction_id);
      console.log(Amount);
      console.log(bank);
      console.log(card_no);
      */
      return res.status(400).json({ message: 'Incomplete data. Please provide all required fields.' });
    }

    const request = new Request(`
      EXEC BookTicket
        @RNR_no_tik_pay = ${RNR_no_tik_pay},
        @userID = '${userID}',
        @train_no = ${train_no},
        @passenger_name = '${passenger_name}',
        @source = '${source}',
        @distination = '${distination}',
        @seat_no = ${seat_no},
        @transaction_id = ${transaction_id},
        @Amount = ${Amount},
        @bank = '${bank}',
        @card_no = '${card_no}',
        @seat_avaliable = 10
    `, (err, rowCount) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: 'Error booking ticket.', error: err.message });
      } else {
        console.log('Query executed successfully. Row count:', rowCount);
        res.status(200).json({ message: 'Ticket booked successfully.' });
      }
    });

    connection.execSql(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error booking ticket.', error: err.message });
  }
});
///////////////////////////////////////////////////////////////////////////



app.post("/cancel", async (req, res) => {
    try {
      const { RNR_no } = req.body;
  
      if (RNR_no === undefined) {
        return res.status(400).json({ message: 'Incomplete data. Please provide RNR_no.' });
      }
  
      const request = new Request('CancelTicket', (err, rowCount) => {
        if (err) {
          console.error('Error executing stored procedure:', err);
          res.status(500).json({ message: 'Error cancelling ticket.', error: err.message });
        } else {
          console.log('Stored procedure executed successfully. Row count:', rowCount);
          if (rowCount > 0) {
            res.status(200).json({ message: 'Ticket cancelled successfully.' });
          } else {
            res.status(404).json({ message: 'RNR_no does not exist in the booking table.' });
          }
        }
      });
  
      request.addParameter('RNR_no', TYPES.Int, RNR_no);
      connection.callProcedure(request);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error cancelling ticket.', error: err.message });
    }
  });
  

  ///////////////////////////////////////////////////////

  app.get('/search', (req, res) => {
    try {
      const { RNR_no } = req.query;
  
      if (!RNR_no) {
        return res.status(400).json({ message: 'Incomplete data. Please provide RNR_no.' });
      }
  
      const request = new Request('SearchTicketStatus', (err, rowCount) => {
        if (err) {
          console.error('Error executing stored procedure:', err);
          res.status(500).json({ message: 'Error searching ticket status.', error: err.message });
        }
      });
  
      request.addParameter('RNR_no', TYPES.Int, RNR_no);
      request.on('row', (columns) => {
        let ticket = {};
        columns.forEach((column) => {
          ticket[column.metadata.colName] = column.value;
        });
  
        if (ticket.TicketStatus === 'Booked') {
          res.status(200).json(ticket);
        } else if (ticket.TicketStatus === 'Cancelled') {
          res.status(404).json({ message: 'Ticket is cancelled.' });
        } else {
          res.status(404).json({ message: 'Ticket not found.' });
        }
      });
  
      connection.callProcedure(request);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error searching ticket status.', error: err.message });
    }
  });
  