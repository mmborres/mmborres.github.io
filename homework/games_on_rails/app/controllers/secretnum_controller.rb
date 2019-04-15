class SecretnumController < ApplicationController
    @@secretnumber = 1;
    @@guessedcorrect = true;

    def show

        if (@@guessedcorrect)
            @@secretnumber = rand 1..100
        end

        @secret = @@secretnumber

        render :show
    end

    def result
        
        guessed = params[:number].to_i

        if guessed > @@secretnumber
            @result = "lower. Sorry."
            @@guessedcorrect = false
        end

        if guessed < @@secretnumber
            @result = "higher. Sorry."
            @@guessedcorrect = false
        end

        if guessed == @@secretnumber
            @result = "correctly guessed. Congratulations."
            @@guessedcorrect = true
        end

        @secret = @@secretnumber

        render :result
    end

end
