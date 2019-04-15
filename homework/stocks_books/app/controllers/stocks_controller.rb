class StocksController < ApplicationController
    def show
        render :show
    end

    def result
#binding.pry
        @stocklookup = params[:companyname]

        #if @stocklookup.empty?==false
    
        @info = StockQuote::Stock.quote @stocklookup
    
        redirect to('/') if @info.nil?
        
        @result = @info.close

        render :result
    end

end
