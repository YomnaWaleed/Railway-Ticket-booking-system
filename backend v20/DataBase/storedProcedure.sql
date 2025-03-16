CREATE OR ALTER PROCEDURE BookTicket
    @RNR_no_tik_pay int,
    @userID varchar(20),
    @train_no int,
    --@Date_time datetime,
    @passenger_name varchar(50),
    --@class varchar(10),
    @source varchar(20),
    @distination varchar(20),
    @seat_no int,
    @transaction_id int,
    @Amount decimal(10,2),
    @bank varchar(20),
    @card_no varchar(20),
	@seat_avaliable int  
AS 
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; -- Start a transaction
        
        -- Insert into ticket_payment table
        INSERT INTO ticket_payment (RNR_NO, train_no, passenger_name, source, distination, seat_no, transaction_id, Amount, bank, card_no)
        VALUES (@RNR_no_tik_pay, @train_no,  @passenger_name, @source, @distination, @seat_no, @transaction_id, @Amount, @bank, @card_no);
        
        -- Insert into User_ table
        IF NOT EXISTS (SELECT 1 FROM User_ WHERE userID = @userID)
        BEGIN
            INSERT INTO User_ (userID) VALUES (@userID);
        END

		 -- Insert into tain table
        IF   @train_no in (SELECT train_no FROM Train )
        BEGIN
			set @seat_avaliable = (select seat_avaliable from Train where train_no =@train_no)
			declare @new_seatAval int = @seat_avaliable -1
			update Train
			set seat_avaliable = @new_seatAval
			where train_no = @train_no

        END
		else
		begin
		   INSERT INTO Train (train_no, seat_avaliable) VALUES (@train_no , @seat_avaliable);
       
		end
		
		
		

        -- Insert into booking table
        INSERT INTO booking (RNR_no_tik_pay, userID)
        VALUES (@RNR_no_tik_pay, @userID);
        
        COMMIT TRANSACTION; -- Commit the transaction if everything is successful
        
        RETURN 0;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION; -- Rollback the transaction if there's an error
        RETURN 1;
    END CATCH
END;




DECLARE @res int;

EXEC @res = BookTicket
    @RNR_no_tik_pay = 27,
    @userID = '999',
    @train_no = 108,
    @passenger_name = 'yomnawa',
    @source = 'miki',
    @distination = 'm',
    @seat_no = 20,
    @transaction_id = 44,
    @Amount = 40.3,
    @bank = 'ouda',
    @card_no = '256',
	@seat_avaliable = 9;

SELECT @res AS res;


CREATE OR ALTER PROCEDURE CancelTicket
    @RNR_no int 
AS 
BEGIN
    BEGIN TRY
        -- Check if the RNR_no exists in booking table
        IF EXISTS (SELECT 1 FROM booking WHERE RNR_no_tik_pay = @RNR_no)
        BEGIN
            -- Get userID from booking table for the provided RNR_no
            DECLARE @userId varchar(20) = (SELECT userID FROM booking WHERE RNR_no_tik_pay = @RNR_no);

            -- Insert into cancel table
            INSERT INTO cancel (RNR_no_tik_pay, userID)
            VALUES (@RNR_no, @userId);

            -- Increment seat_avaliable in Train table
            DECLARE @trainNo int = (SELECT train_no FROM ticket_payment WHERE RNR_NO = @RNR_no);
            UPDATE Train
            SET seat_avaliable = seat_avaliable + 1
            WHERE train_no = @trainNo;

            RETURN 0; -- Success
        END
        ELSE
        BEGIN
            RAISERROR('RNR_no does not exist in the booking table.', 16, 1);
            RETURN 1; -- Error: RNR_no not found in booking table
        END
    END TRY
    BEGIN CATCH
        RETURN 1; -- Error: Something went wrong
    END CATCH
END;


declare @RREs int
EXEC @RREs = CancelTicket 25
select @RREs as res



CREATE OR ALTER PROCEDURE SearchTicketStatus
    @RNR_no int 
AS 
BEGIN
    BEGIN TRY
        DECLARE @Status varchar(20)

        -- Check if the RNR_no exists in the booking table
        IF EXISTS (SELECT 1 FROM booking WHERE RNR_no_tik_pay = @RNR_no)
        BEGIN
            -- Check if the RNR_no exists in the cancel table
            IF EXISTS (SELECT 1 FROM cancel WHERE RNR_no_tik_pay = @RNR_no)
            BEGIN
                SET @Status = 'Cancelled'
                -- Return null as ticket is cancelled
                SELECT @Status AS TicketStatus, NULL AS train_no, NULL AS Date_time, NULL AS passenger_name, NULL AS class, NULL AS source, NULL AS distination, NULL AS seat_no, NULL AS transaction_id, NULL AS Amount, NULL AS bank, NULL AS card_no
            END
            ELSE
            BEGIN
                SET @Status = 'Booked'
                -- Return ticket information from ticket_payment table
                SELECT @Status AS TicketStatus, tp.train_no, tp.Date_time, tp.passenger_name, tp.class, tp.source, tp.distination, tp.seat_no, tp.transaction_id, tp.Amount, tp.bank, tp.card_no
                FROM ticket_payment tp
                WHERE tp.RNR_NO = @RNR_no
            END
        END
        ELSE
        BEGIN
            SET @Status = 'Not Found'
            -- Return null as RNR_no not found in booking table
            SELECT @Status AS TicketStatus, NULL AS train_no, NULL AS Date_time, NULL AS passenger_name, NULL AS class, NULL AS source, NULL AS distination, NULL AS seat_no, NULL AS transaction_id, NULL AS Amount, NULL AS bank, NULL AS card_no
        END

    END TRY
    BEGIN CATCH
        THROW;
    END CATCH
END;



-- Declare variables to store the result
DECLARE @TicketStatus varchar(20),
        @TrainNo int,
        @DateTime datetime,
        @PassengerName varchar(50),
        @Class varchar(10),
        @Source varchar(20),
        @Destination varchar(20),
        @SeatNo int,
        @TransactionId int,
        @Amount decimal(10, 2),
        @Bank varchar(20),
        @CardNo varchar(20);

-- Set the RNR_no to search
DECLARE @RNR_no int = 27; -- Change this to the desired RNR_no

-- Execute the stored procedure
EXEC SearchTicketStatus @RNR_no;

-- Check the result
IF @TicketStatus = 'Booked'
BEGIN
    PRINT 'Ticket Status: ' + @TicketStatus;
    PRINT 'Train No: ' + CAST(@TrainNo AS varchar(10));
    PRINT 'Date Time: ' + CONVERT(varchar(30), @DateTime, 121);
    PRINT 'Passenger Name: ' + @PassengerName;
    PRINT 'Class: ' + @Class;
    PRINT 'Source: ' + @Source;
    PRINT 'Destination: ' + @Destination;
    PRINT 'Seat No: ' + CAST(@SeatNo AS varchar(10));
    PRINT 'Transaction ID: ' + CAST(@TransactionId AS varchar(10));
    PRINT 'Amount: ' + CAST(@Amount AS varchar(20));
    PRINT 'Bank: ' + @Bank;
    PRINT 'Card No: ' + @CardNo;
END
ELSE IF @TicketStatus = 'Cancelled'
BEGIN
    PRINT 'Ticket Status: ' + @TicketStatus;
    PRINT 'Ticket is cancelled.';
END
ELSE IF @TicketStatus = 'Not Found'
BEGIN
    PRINT 'Ticket Status: ' + @TicketStatus;
    PRINT 'Ticket not found.';
END
