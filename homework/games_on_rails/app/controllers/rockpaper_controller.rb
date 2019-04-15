class RockpaperController < ApplicationController
    @@playoptions = ["rock", "paper", "scissors"]
    @@currentplay = @@playoptions[0]

    def show

        ran = rand 0...3
        @@currentplay = @@playoptions[ran]

        render :show
    end

    def result

        @move = params[:move].to_s

        @result = "It's a Draw!"

        if @@currentplay == "rock" && @move == "paper"
            @result = "You won."
        end
        
        if @@currentplay == "rock" && @move == "scissors"
            @result = "You lost."
        end

        if @@currentplay == "paper" && @move == "rock"
            @result = "You lost."
        end
        
        if @@currentplay == "paper" && @move == "scissors"
            @result = "You won."
        end

        if @@currentplay == "scissors" && @move == "paper"
            @result = "You lost."
        end
        
        if @@currentplay == "scissors" && @move == "rock"
            @result = "You won."
        end

        @curplay = @@currentplay.to_s

        render :result
    end

end
